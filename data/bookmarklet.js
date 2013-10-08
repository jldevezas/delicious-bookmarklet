function show(data) {
	if (data.url.indexOf("http") != 0) {
		console.log("Invalid protocol!");
		return;
	}

	document.body.innerHTML = "";

	(function (e, t) {
		var n = e.document;
		setTimeout(function () {
			function a(e) {
				if (e.data === "destroy_bookmarklet") {
					var r = n.getElementById(t);
					if (r) {
						self.port.emit("close-me");
						n.body.removeChild(r);
						r = null
					}
				}
			}
			var t = "DELI_bookmarklet_iframe",
				r = n.getElementById(t);
			if (r) {
				return
			}
			var i = "http://delicious.com/save?",
				s = n.createElement("iframe");
			s.id = t;
			s.src = i + "url=" + encodeURIComponent(data.url) +
				"&title=" + encodeURIComponent(data.title) +
				"&note=" + encodeURIComponent(data.note ? data.note : "") + "&v=1.1";
			s.style.position = "fixed";
			s.style.top = "0";
			s.style.left = "0";
			s.style.height = "100%";
			s.style.width = "100%";
			s.style.zIndex = "16777270";
			s.style.border = "none";
			s.style.visibility = "hidden";

			s.onload = function () {
				this.style.visibility = "visible"
			};

			n.body.appendChild(s);
			var o = e.addEventListener ? "addEventListener" : "attachEvent";
			var u = o == "attachEvent" ? "onmessage" : "message";
			e[o](u, a, false)
		}, 1);
	})(window);
}

self.port.on("show", show);
