# homework-assignment-4

Hey there,

I am writing this at around 22:35. it was a tough day with the heat, not allowing me perform optimally (major headache etc.).

I sent the links at around 21:56, the same time where I deployed the master to github and heroku.
For modules, I used express, pg, sequelize, jsonwebtwoken and bcrypt. 

There is one feature I improved upon after 22:00. This relates to posting a song, it now properly checks if the 
user is authorized to post in the playlist (only their own). I finished that code at around 22:30

-I HAVE NOT PUSHED THAT CHANGE TO REMOTE MASTER-

Obviously because of the deadline.

The code that was changed can be found in Song/router.js In there, I also forgot to remove the findAll 
I used for debugging, sorry for that, it happened in haste when sending in the assignment. To see how the 
code changed, refer to the bottom of the readme.

I could push these changes to a branch, or master (on GH and heroku) if you would like to check them out.

Thank you for taking the time to read this.

kind regards,

Marten



The POST method now looks like:

----------------------------------------------------------------------------------------
router.post('/songs', auth, (req, res, next) => {
    const splitUrl = req.baseUrl.split("")
    const listId = splitUrl.slice(-1)[0]
    const head = req.headers.authorization && req.headers.authorization.split(' ')
    const data = toData(head[1])
    Playlist.findByPk(listId)
        .then(playlist => {
            if (playlist.userId !== data.userId) {
                return res.status(404).json({ message: 'Forbidden' })
            } else {
                Song
                    .create({
                        title: req.body.title,
                        artist: req.body.artist,
                        album: req.body.album,
                        playlistId: listId
                    })
                    .then(song => { res.status(201).json(song) })
                    .catch(error => next(error))
            }
        })
})
------------------------------------------------------------------------------------



