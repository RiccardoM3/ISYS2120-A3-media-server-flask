Player = function() {
    let self = this;
    self.player = null;
    self.progress_info = {
        media_id: null,
        username: null,
        progress: null,
        save_interval_time: null,
        save_progress_interval: null
    };

    this.init = function(id, media_id, username, progress, save_interval_time) {
        console.log(id)
        console.log(media_id)
        console.log(username)
        console.log(progress)
        console.log(save_interval_time)
        
        self.player = document.getElementById(id)
        if (username !== undefined && username !== null) {
            self.progress_info.media_id = media_id;
            self.progress_info.username = username;
            self.progress_info.progress = progress;
            self.progress_info.save_interval_time = save_interval_time,
            self.progress_info.save_progress_interval = setInterval(self.saveProgress, save_interval_time);

            self.player.currentTime = (progress / 100) * self.player.duration
        }
    }

    //POST request to save the progress
    this.saveProgress = function() {
        if (self.player.duration > 0 && self.progress_info.username && self.progress_info.media_id) {
            let currentProgress = self.player.currentTime / self.player.duration;
            console.log('saving progress:' + currentProgress)
            
            xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/progress/save", true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.send(self.buildParams({
                'username' : self.progress_info.username,
                'media_id' : self.progress_info.media_id,
                'progress' : currentProgress
            }));
        }
    }

    this.buildParams = function(params) {
        let urlEncodedDataPairs = []
        for(field in params) {
            urlEncodedDataPairs.push(encodeURIComponent(field)+'='+encodeURIComponent(params[field]));
        }
        return urlEncodedDataPairs.join("&")
    }
}

player = new Player();