<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="application/pdf; charset=utf-8"/>
    <title></title>
    <style>
    	body {
    	}

    	.container-full {
			
    	}

    	section {
    		margin: 50px 0;
    		background: #f6f9fc;
    		border: 1px solid #cfd2d7;
    		padding: 0 30px 20px 30px;
    	}

    	header h3 {
    		padding: 10px 0;
    		color: #607786;
    		border-bottom: 1px solid #cfd2d7;
    	}

    	.table {
    		padding: 20px 0 0 0;
    	}

    	.table tr > td {
    		padding-bottom: 20px;
    	}

    	.content {
    		padding: 10px 20px;
			background: #fff;
			border-radius: 4px;
			min-height: 200px;
    	}

    	.table .label {
    		font-weight: bold;
    		font-size: 12px;
    		width: 30%;
    		text-align: right;
    		padding-right: 40px;
    		letter-spacing: 2px;
    	}

    	.table .input-container {
    		background: #fff;
    		border-radius: 4px;
			padding: 10px 20px;
    	}

    	.height-30 {
    		height: 30px !important;
    	}

    	.height-125 {
    		height: 125px !important;
    	}

    	.height-200 {
    		height: 200px !important;
    	}

    	.page-break {
    		page-break-after: always;
    	}
    </style>
</head>
<body>
	<div class="container-full">
		<section>
			<header>
				<h3>1. Beställare</h3>
			</header>
			<div class="table">
				<table border="0" width="100%">
					<tr>
						<td class="label" width="40%">NAMN</td>
						<td width="60%">
							<div class="input-container {{ empty($client_name) ? 'height-30' : '' }}">{{ $client_name ?? ' ' }}</div>
						</td>
					</tr>
					<tr>
						<td class="label" width="40%">ORGANISATIONS/-PERSONNUMMER</td>
						<td width="60%">
							<div class="input-container {{ empty($client_identity) ? 'height-30' : '' }}">{{ $client_identity ?? ' ' }}</div>
						</td>
					</tr>
				</table>
			</div>
		</section>

		<section>
			<header>
				<h3>2. Utförare</h3>
			</header>
			<div class="table">
				<table border="0" width="100%">
					<tr>
						<td class="label" width="40%">NAMN</td>
						<td width="60%">
							<div class="input-container {{ empty($contractor_name) ? 'height-30' : '' }}">{{ $contractor_name ?? ' ' }}</div>
						</td>
					</tr>
					<tr>
						<td class="label" width="40%">ORGANISATIONS/-PERSONNUMMER</td>
						<td width="60%">
							<div class="input-container {{ empty($contractor_identity) ? 'height-30' : '' }}">{{ $contractor_identity ?? ' ' }}</div>
						</td>
					</tr>
				</table>
			</div>
		</section>

		<div class="page-break"></div>

		<section>
			<header>
				<h3>3. Projektets beskrivning</h3>
			</header>
			<div class="content {{ empty($project_description) ||  strlen($project_description) < 300 ? 'height-200' : ''}}">
				{{ $project_description ?? ' ' }}
			</div>
		</section>

		<section>
			<header>
				<h3>4. Utförarens avrådande</h3>
			</header>
			<div class="content {{ empty($contractor_dissuasion) ||  strlen($contractor_dissuasion) < 300 ? 'height-200' : ''}}">
				{{ $contractor_dissuasion ?? ' ' }}
			</div>
		</section>

		<div class="page-break"></div>

		<section>
			<header>
				<h3>5. Tider</h3>
			</header>
			<div class="table">
				<table border="0" width="100%">
					<tr>
						<td class="label" width="40%">ARBETET SKA PÅBÖRJAS</td>
						<td width="60%">
							<div class="input-container {{ empty($project_start) ? 'height-30' : '' }}">{{ $project_start ?? ' ' }}</div>
						</td>
					</tr>
					<tr>
						<td class="label" width="40%">ARBETET SKA VARA SLUTFÖRT</td>
						<td width="60%">
							<div class="input-container {{ empty($project_end) ? 'height-30' : '' }}">{{ $project_end ?? ' ' }}</div>
						</td>
					</tr>
				</table>
			</div>
		</section>

		<section>
			<header>
				<h3>6. Priser</h3>
			</header>
			<div class="table">
				<table border="0" width="100%">
					<tr>
						<td class="label" width="40%">TOTALSUMMA</td>
						<td width="60%">
							<div class="input-container {{ empty($project_price) ? 'height-30' : '' }}">{{ $project_price ?? ' ' }}</div>
						</td>
					</tr>
					<tr>
						<td class="label" width="40%">SPECIFICERAT</td>
						<td width="60%">
							<div class="input-container {{ empty($project_price_specified) ||  strlen($project_price_specified) < 200 ? 'height-125' : ''}}">
								{{ $project_price_specified ?? '' }}
							</div>
						</td>
					</tr>
				</table>
			</div>
		</section>

		<div class="page-break"></div>

		<section>
			<header>
				<h3>7. Betalning</h3>
			</header>
			<div>
				<div class="content">
					<ul>
						@if ( isset($payment_full) && $payment_full )
							<li>Hela beloppet betalas när arbetet är slutfört.</li>
						@endif

						@if ( isset($payment_specified) && $payment_specified )
							<li>Beställaren vill ha en specificerad faktura.</li>
						@endif
						<div style="margin-top: 10px; font-weight: bold;">Om ni ej avtal om något annat så gäller följande:</div>
						<ul>
							<li>Arbeten som anges i fakturan ska vara slutförda när faktureringen sker.</li>
							<li>Fakturan ska betalas inom 30 dagar efter beställaren mottagit fakturan.</li>
							<li>Om betalningen ej sker inom rätt tid ska beställaren betala dröjsmålsränta enligt räntelagen.</li>
						</ul>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<header>
				<h3>8. Övrigt</h3>
			</header>
			<div class="content {{ empty($other) ||  strlen($other) < 300 ? 'height-200' : ''}}">
				{{ $other ?? ' ' }}
			</div>
		</section>
	</div>
</body>