<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="application/pdf; charset=utf-8"/>
    <title>{{ $title }}</title>

    <style>
        .invoice-box{
            max-width:800px;
            margin:auto;
            padding:30px;
            border:1px solid #eee;
            box-shadow:0 0 10px rgba(0, 0, 0, .15);
            font-size:16px;
            line-height:24px;
            font-family:'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color:#555;
        }
        
        .invoice-box table{
            width:100%;
            text-align:left;
        }
        
        .invoice-box table td{
            padding:5px;
            vertical-align:top;
        }
        
        .invoice-box table tr td:nth-child(2){
            text-align:right;
        }
        
        .invoice-box table tr.top table td{
            padding-bottom:20px;
        }
        
        .invoice-box table tr.top table td.title{
            font-size:45px;
            line-height:45px;
            color:#333;
        }
        
        .invoice-box table tr.information table td{
            padding-bottom:40px;
        }
        
        .invoice-box table tr.heading td{
            background:#eee;
            border-bottom:1px solid #ddd;
            font-weight:bold;
        }
        
        .invoice-box table tr.details td{
            padding-bottom:20px;
        }

        .invoice-box table tr.notes {
            padding: 10px 0;
        }
        
        .invoice-box table tr.item td{
            border-bottom:1px solid #eee;
        }
        
        .invoice-box table tr.item.last td{
            border-bottom:none;
        }
        
        .invoice-box table tr.totals-line td:nth-child(2){
            
        }

        .invoice-box table tr.total td:nth-child(2){
            border-top:2px solid #eee;
            font-weight:bold;
        }
        
        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td{
                width:100%;
                display:block;
                text-align:center;
            }
            
            .invoice-box table tr.information table td{
                width:100%;
                display:block;
                text-align:center;
            }
        }
    </style>
</head>

<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title">
                                My Logo
                            </td>
                            
                            <td>
                                Faktura #: {{ $invoice_id }}<br>
                                Fakturadatum: {{ $created }}<br>
                                Förfallodatum: {{ $due }}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                <br>
                                Bidder AB<br>
                                Helsingborg<br>
                                support@bidder.se
                            </td>
                            
                            <td>
                                <strong>Mottagare</strong><br>
                                {{ $user->name }}<br>
                                {{ '@' . $user->username }}<br>
                               {{ $user->email }}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        
            
            <tr class="heading">
                <td>
                    Artikel
                </td>
                
                <td>
                    Pris
                </td>
            </tr>
            
            <tr class="item">
                <td>
                    <div>Tjänst förmedlad</div>
                    <small><strong>För projekt:</strong> {{ $project_title }}</small>
                </td>
                
                <td>
                    {{ $total }}
                </td>
            </tr>

            <tr class="notes">
                <td colspan="2">
                    <small>
                        <div><strong>Noteringar</strong></div>
                        {{ $notes }}
                    </small>
                </td>
            </tr>
            
            <tr class="totals-line">
                <td></td>
                
                <td>
                   Belopp före moms: {{ $sub_total }}
                </td>
            </tr>

            <tr class="totals-line">
                <td></td>
                
                <td>
                  Total moms: {{ $vat }}
                </td>
            </tr>

            <tr class="total">
                <td></td>
                
                <td>
                   Att betala (SEK): {{ $total }}
                </td>
            </tr>
        </table>
    </div>
</body>
</html>