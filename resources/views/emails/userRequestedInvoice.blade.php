@component('mail::message')

<p>En användare har begärt att få en faktura.</p>

<p>Det är invoice med id: {{ $invoice->id }}</p>

@endcomponent