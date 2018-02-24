@component('mail::message')

<p>Ny feedback från GoBid</p>

<p><strong>Ämne:</strong><br> {{ $feedback->subject }}</p>
<p><strong>Användarens email:</strong><br> {{ $feedback->email}}</p>
<p><strong>Feedback:</strong><br> {{ $feedback->feedback }}</p>

@endcomponent