<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        

        <title>GoBid</title>
        
        <style>
            body {
                overflow-x: hidden;
                margin: 0;
            }
            
            header {
                background: #1d1d20;
                color: #eee;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
                padding: 10px;
                z-index: 500000;
                transition: transform .5s;
            }

            .mobile-menu {
                background: red;
                transform: translateX(-265px);
                box-sizing: border-box;
                padding: 0;
                margin: 0;
                position: fixed;
                top: 0;
                left: 0;
                width: 265px;
                height: 100%;
                z-index: 600000;
                overflow-y: auto;
                overflow-x: hidden;
                visibility: hidden;
                opacity: 0;
                max-width: 95%;
                transition: transform .5s;
            }

            .site-wrap {
                padding: 35px 0 0 0;
                left: 0;
                top: 0;
                z-index: 250;
                margin: 0;
                position: relative;
                max-width: 100%;
                overflow: hidden;
                background: blue;
                transition: transform .5s;
            }

            body.open .site-wrap {
                transform: translateX(265px);
            }

            body.open header {
                transform: translateX(265px);
            }

            body.open .mobile-menu {
                transform: translateX(0);
                visibility: visible;
                opacity: 1;
                max-height: 480px;
            }
        </style>

        
    </head>
    <body>
        
        <header>
            <button type="button" id="test">Go</button>
        </header>

        <div class="mobile-menu">
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <br><br><br><br><br><br><br><br><br><br><br><br><br>
            Menu from http://shiftnav.io/
        </div>

        <div class="site-wrap">
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>Yooo
        </div>


        <script>
            document.getElementById("test").addEventListener("click", function( event ) {
                if ( document.body.classList.contains('open') ) {
                    document.body.classList.remove('open');
                } else {
                    document.body.classList.add('open');
                }
            }, false);
        </script>
    </body>
</html>
