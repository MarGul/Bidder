<?php

namespace App\Managers;

use App\Feedback;
use Mail;
use App\Mail\Feedback as FeedbackMail;

class FeedbackManager extends BaseManager
{

    /**
     * The feedback that the manager is working on.
     * @var App\Feedback
     */
    protected $feedback;


    /**
     * Create a feedback entry
     *
     * @param   array       $data
     * @return  boolean
     */
    public function create($data)
    {
        try {
            $this->feedback = Feedback::create([
                'subject' => $data['subject'],
                'email' => $data['email'],
                'feedback' => $data['feedback']
            ]);
        } catch ( \Exception $e ) {
            $this->setError('Could not insert the feedback into storage', 500);
            return false;
        }

        Mail::to('gullbeerg@gmail.com')->send(new FeedbackMail($this->feedback));

        $this->setSuccess('Successfully recieved the feedback.', 200);

        return true;
    }

}