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

	$.ajax ({
		type: "GET",
		url: this.sensors[index].selfLink,
		headers: {
			"Authorization": "Basic " + btoa(this.auth_str)
		},
		success: function(data) {
			if (callback)
				callback(data["sensor_reading"]); 
		},
		error: function() {
			if (callback)
				callback(null);
		}
	});	
};
