// https://jsonplaceholder.typicode.com/posts

const titleField = document.querySelector('#titleField');
const bodyField = document.querySelector('#bodyField');
const insertButton = document.querySelector('#insertButton');
const posts = document.querySelector('.posts');



const readPosts = async () => {
    posts.innerHTML = 'Carregando os posts...';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();
    
    if(json.length > 0) {
        montarBlog(json);
    } else {
        alert('Nenhum post para exibir');
        posts.innerHTML = '';
    }
}

const insertPost = async (title, body) => {
    await fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    title: title,
                    body: body,
                    userId: 2
                }
            )
        }
    );

    titleField.value = '';
    bodyField.value = '';

    readPosts();

}


const montarBlog = (lista) => {
    posts.innerHTML = '';

    for(let i in lista) {
        let html = document.createElement('div');

        html.innerHTML = `<h2>${lista[i].title}</h2><br>`;
        html.innerHTML += `<p>${lista[i].body}</p><br>`;
        html.innerHTML += `<p>${lista[i].userId}</p><br>`;
        html.innerHTML += `<hr>`;

        posts.appendChild(html);
    }

}


insertButton.addEventListener('click',() => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;


    if(title && body) {
        insertPost(title, body);
    } else {
        alert('Preencha todos os campos!');
    }
});

readPosts();
