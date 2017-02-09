<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://opensource.keycdn.com/fontawesome/4.7.0/font-awesome.min.css" integrity="sha384-dNpIIXE8U05kAbPhy3G1cz+yZmTzA6CY8Vg/u2L9xRnHjJiAK76m2BIEaSEV+/aU" crossorigin="anonymous">

        <title>Bidder</title>
        <link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">
        
        <script>
            window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token()
            ]); ?>
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
        
        <script src="{{ URL::asset('js/app.js') }}"></script>
    </body>
</html>
