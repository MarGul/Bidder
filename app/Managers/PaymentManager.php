<?php

namespace App\Managers;

use App\Managers\Traits\InvoiceTrait;
use App\Payment;

class PaymentManager extends BaseManager
{
    use InvoiceTrait;


    /**
     * The payment that the manager is working with.
     * @var App\Payment
     */
    protected $payment;
    /**
     * The payment that the manager has been working with.
     * @return App\Payment
     */
    public function payment() { return $this->payment; }
    

    /**
     * Complete a payment with stripe.
     *
     * @param   array       $data
     * @return  boolean
     */
    public function payWithStripe($token)
    {
        try {
            \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

            $charge = \Stripe\Charge::create([
                'amount' => $this->invoice->total * 100,
                'currency' => 'sek',
                'description' => 'Test charge',
                'metadata' => ['invoice_id' => $this->invoice->id],
                'receipt_email' => $this->user->email,
                'source' => $token['id']
            ]);

            if ( $charge->paid ) {
                $data = [
                    'invoice_id' => $this->invoice->id,
                    'user_id' => $this->user->id,
                    'payment_method' => 'stripe',
                    'amount_paid' => $charge->amount / 100,
                    'transaction_id' => $charge->id
                ];
                
                if ( !$this->setData($data)->insert() ) {
                    $this->setError('Betalningen har skapats men vi hade ett fel på vår sida. Vi kommer att återkoppla till dig snarast.', 500);
                    
                    return false;
                }

                // Everything looks OK
                $this->setSuccess('Betalningen genomfördes.', 201);
                return true;
            } else {
                $this->setError('Betalningen misslyckades. Stripe gav tillbaka denna informationen: ' . $charge->outcome->seller_message, 500);
            }
        } catch ( \Stripe\Error\Card $e ) {
            // Something went wrong with charging the card. Say insufficient funds or something,
            $body = $e->getJsonBody();
            $err = $body['error'];
            $this->setError('Betalningen misslyckades. Stripe gav tillbaka denna informationen: ' . $err['message'], 500);
        } catch ( \Stripe\Error\RateLimit $e ) {
            // To many API requests has been made on a short amount of time.
            $this->setError('Betalningen misslyckades. Var vänlig och försök igen.', 500);
        } catch ( \Stripe\Error\InvalidRequest $e ) {
            // The params passed into the charge is not valid.
            $this->setError('Betalningen misslyckades. Var vänlig försök igen eller kontakta oss för att lösa problemet.', 500);
        } catch ( \Stripe\Error\Authentication $e ) {
            // Authentication with stripe failed. Have we changed the API key?
            $this->setError('Betalningen misslyckades. Var vänlig kontakta oss för att lösa problemet.');
        } catch ( \Stripe\Error\ApiConnection $e ) {
            // Network communication with stripe failed,
            $this->setError('Stripe svarar inte just nu. Var vänlig och försök igen.', 500);
        } catch ( \Stripe\Error\Base $e ) {
            // Something generic went wrong,
            $this->setError('Något gick fel. Vi har blivit notifierade om felet och kommer att återkoppla till dig snarast. Prova gärna en annan betalmetod så länge.', 500);
        } catch ( \Exception $e) {
            // Something not Stripe related went wrong.
            $this->setError('Något gick fel. Vi har blivit notifierade om felet och kommer att återkoppla till dig snarast. Prova gärna en annan betalmetod så länge.', 500);
        }

        return $this->hasError();
    }

    /**
     * Complete a payment with invoice
     *
     * @return boolean
     */
    public function payWithInvoice()
    {

    }


    /**
     * Insert a payment into storage.
     *
     * @return boolean
     */
    protected function insert()
    {
        $this->payment = Payment::create($this->data());

        if ( $this->payment->id ) {
            $this->invoice->update(['payment_id' => $this->payment->id]);

            return true;
        }

        return false;
    }
}