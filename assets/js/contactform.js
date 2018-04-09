$(document).ready(function() {
	$("#form_contattaci input[type=button]").click(function() {
		var name = $("#nominativo").val();
		var email = $("#email").val();
		var message = $("#messaggio").val();
		var contact = $("#contact").val();
		$("#returnmessage").empty(); // To empty previous error/success message.
		// Checking for blank fields.
		if (name == '' || email == '' || contact == '') {
			alert("Inserisci tutti i dati per il contatto.");
		} else {
		// Returns successful data submission message when the entered information is stored in database.
			$.post("/contact_form.php", {
				name1: name,
				email1: email,
				message1: message
				}, function(data) {
					$("#returnmessage").append(data); // Append returned message to message paragraph.
					if (data == "La tua richiesta &egrave; stata registrata. Sarete contattati al pi&ugrave; presto.") {
						$("#form_contattaci")[0].reset(); // To reset form fields on success.
					}
			});
		}
	});
});