$(document).ready(function() {
	$('#detect_malaria_btn').click(function(event) {
		event.preventDefault();
		// $('#image').get(0).files.length === 0
		// document.getElementById("image").value != ""
		$('#successAlert_converter').hide();
		if(($('#image').get(0).files.length) > 0) {
			var form_data = new FormData();
			form_data.append('file', $('#image').prop('files')[0]);
			var outputDiv = document.getElementById("malariaDetectionResult");
			outputDiv.innerHTML="<img src='./static/Images/Loading.gif'>";

			event.preventDefault();
			$.ajax({
				type: 'POST',
				url: '/upload-image',
				data: form_data,
				contentType: false,
				cache: false,
				processData: false,
				success: function (data, status, xhr) {
					// success callback function
					// alert("Testing before if");
					if (data.error) {
						// alert("Testing if");
						$('#errorAlert_converter').text(data.error).show();
						$('#successAlert_converter').hide();
					} else {
						// alert("Testing else");
						$('#successAlert_converter').text("Prediction Done Successfully").show();
						console.log("Printing data opject below")
						console.log(data.Index1)
						console.log("Printing data object converted into string form")
						console.log(JSON.stringify(data))
						obj = JSON.parse(JSON.stringify(data));
						var OutputDiv = document.getElementById("malariaDetectionResult");
						OutputDiv.innerHTML = "<table class=\"table table-bordered table-striped\">\n" +
												"  <thead>\n" +
												"      <tr>\n" +
												"        <th colspan=\"2\"><center><h2>Malaria Prediction Table</h2></center></th>\n" +
												"      </tr>\n" +
												"    </thead>\n" +
												"    <thead>\n" +
												"      <tr>\n" +
												"        <th>Type</th>\n" +
												"        <th>Value</th>\n" +
												"      </tr>\n" +
												"    </thead>\n" +
												"    <tbody>\n" +
												"      <tr>\n" +
												"        <td>Not Malaria</td>\n" +
												"        <td>" + obj.Index1 +"</td>  \n" +
												"      </tr>\n" +
												"      <tr>\n" +
												"        <td>Malaria</td>\n" +
												"        <td>" + obj.Index2 +"</td>  \n" +
												"      </tr>\n" +
												"    </tbody>\n" +
												"  </table>";

						// $('#downloadBtn').css("display","inline");
						// alert("/DownloadImage");
						$('#errorAlert_converter').hide();
					}
				}
			});
		}
	});
});