### My Personal Anime List
This is a CLI for managing a list of animes, or I guess shows in general, that you've watched.
Eventually it gets to the point that you've watched so many that you can't remember them all, so I like to have a list.
I like to have a list locally on my computer because it's easier to reach and people can't go snooping at it.
That being said, I realize that there are benefits to online sites (like not deleting it on accident, no hard drive failure sending your memories to the void, etc).
I personally like to have both an online and local list.
I also realize that this tool is far from perfect and that at its current state I'd probably rather manage a list manually, but I'm working on it.

Here's some usage information:
```
Usage: mpal [action] <anime name> [options]

Actions:
   new    - create new entry
   remove - remove existing entry
   update - update existing entry
   finish - mark existing entry as finished and sets finish date to current

Options (for new and update actions):
   --rating, -r         numerical anime rating
   --finished, -f       true if provided, whether you've finished the anime
   --finish-date, -d    date finished, null by default

   Everything after double dashes ('--') will be added as comments.
```

An example data file is structured as follows (I need to allow capitals in names):
```
{
    "kimi no na wa": {
        "rating": 9,
        "finished": true,
        "finishDate": "2019-10-26T05:00:00.000Z",
        "comments": [
            "I don't know why so many people hate it"
        ]
    },
    "steins;gate": {
        "rating": 9,
        "finished": true,
        "finishDate": "2019-10-22T05:00:00.000Z",
        "comments": []
    }
}
```