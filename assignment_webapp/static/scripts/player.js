Player = function() {
    let self = this;
    self.player = null;
    self.progress_info = {
        username: null,
        progress: null,
        save_interval: null,
        saveProgressInterval: null
    };

    this.init = function(id, username, progress, save_interval) {
        console.log(id)
        console.log(username)
        console.log(progress)
        console.log(save_interval)
        
        self.player = document.getElementById(id)
        if (username !== undefined && username !== null) {
            self.progress_info.username = username;
            self.progress_info.progress = progress;
            self.progress_info.save_interval = save_interval,
            
            setInterval(self.saveProgress, save_interval);

            self.player.currentTime = (progress / 100) * self.player.duration
        }
    }

    this.saveProgress = function() {
        if (self.player.duration > 0) {
            let currentProgress = self.player.currentTime / self.player.duration;
            console.log('save progress:' + currentProgress) //TODO: POST request to save the progress
        }
    }
}

player = new Player();