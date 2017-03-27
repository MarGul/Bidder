<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreBid extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // Make sure the bid time hasn't gone out.
        $bidStop = Carbon::createFromFormat('Y-m-d H:i:s', $this->route('service')->bid_stop, 'Europe/Stockholm');
        return Carbon::now('Europe/Stockholm') < $bidStop;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'description' => 'required',
            'start' => 'required|date_format:Y-m-d|after_or_equal:today',
            'end' => 'required|date_format:Y-m-d|after_or_equal:today',
            'hours' => 'nullable|numeric',
            'price' => 'required|numeric'
        ];
    }
}
