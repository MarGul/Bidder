<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="canonical" href="https://gobid.se" />
        

        <title>GoBid</title>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        
        <script>
            window.auth = {
                authenticated: {!! json_encode(Auth::check()) !!},
                user: {!! json_encode(Auth::user()) !!}
            }
        </script>

    </head>
    <body>

        <div id="app"></div>

        <!-- Detect Bootstrap breakpoints in JS -->
        <div id="detect-breakpoints">
            <span class="device-xs visible-xs"></span>
            <span class="device-sm visible-sm"></span>
            <span class="device-md visible-md"></span>
            <span class="device-lg visible-lg"></span>
        </div>
        
        @if ( app()->isLocal() )
        <script src="{{ mix('js/app.js') }}"></script>
        @else
        <script src="{{ mix('js/manifest.js') }}"></script>
        <script src="{{ mix('js/vendor.js') }}"></script>
        <script src="{{ mix('js/app.js') }}"></script>
        @endif
    </body>
</html>
