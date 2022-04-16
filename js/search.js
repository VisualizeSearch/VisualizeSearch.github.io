$('#search').keypress(function (e) {
    if (e.code === 'Enter') {
        $('#enter').click();
    }
});

$(document).ready(function() {
    $('#enter').click(function() {
        callapi();
        $('#results').removeClass('invisible');
    });
});

function callapi() {
    const input = document.getElementById('search').value;
    fetch('https://api.allorigins.win/raw?url=https://api.scratch.mit.edu/studios/' + input)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert("invalid studio id");
                $('#search').val('');
            }
            document.getElementById("title").innerText = data.title;
            document.getElementById("image").src = data.image;
            document.getElementById("description").innerText = data.description;

            document.getElementById("followers").innerText = data.stats.followers
            document.getElementById("projects").innerText = data.stats.projects
            document.getElementById("comments").innerText = data.stats.comments

        });
    fetch('https://api.allorigins.win/raw?url=https://api.scratch.mit.edu/studios/' + input + '/comments')
        .then(res => res.json())
        .then(data => {
            document.getElementById("content").innerText = data[0].content;
            document.getElementById("username").innerText = data[0].author.username;
            document.getElementById("pfp-image").src = data[0].author.image;
        });  
    }