const api = "7398182f4f93ed8245846557586a43e0";

async function callme(){
    const a = await fetch(api);
    const b = await a.json();
    console.log(b);
}

callme();