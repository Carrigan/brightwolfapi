function generic_get(url, auth, p_success, p_failure) {
	$.ajax ({
		type: "GET",
		url: url,
		headers: {
			"Authorization": "Basic " + btoa(auth)
		},
		success: function(data) {
			if (p_success)
				p_success(data); 
		},
		error: function() {
			if (p_failure)
				p_failure();
		}
	});			
}

var brightwolfapi = function(username, password, when_done) {
	this.auth_str = username + ":" + password;
	this.sensors = [];

	$.ajax ({
		type: "GET",
		url: "http://riot-hackathon.bright-wolf.net/api/organizations",
		context: this,
		headers: {
			"Authorization": "Basic " + btoa(this.auth_str)
		},
		success: function(data) {
			organization_id = data["organizations_collection"]["organizations"][0]["id"];
			$.ajax ({
				type: "GET",
				url: "http://riot-hackathon.bright-wolf.net/api/sensors?org_id=" + organization_id,
				context: this,
				headers: {
					"Authorization": "Basic " + btoa(this.auth_str)
				},
				success: function(data) {
					this.sensors = data["sensors_collection"]["sensors"];
					if(when_done)
						when_done();
				},
				error: function() {
					alert("Sensors call failed.");
				}
			});	
		},
		error: function() {
			alert("Organization call failed.");
		}
	});	
};

brightwolfapi.prototype.get_sensor = function(callback, index) {
	if(index == null)
		index = 0;

	generic_get(
		this.sensors[index].selfLink,
		this.auth_str,
		function(data) {
			if(callback)
				callback(data["sensor_reading"]);
		},
		function() {
			if(callback)
				callback(null);
		}
	);
};
