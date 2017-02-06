<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

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

        <script src="{{ URL::asset('js/app.js') }}"></script>
    </body>
</html>
