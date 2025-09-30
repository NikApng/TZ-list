

function getServer (funcBack){
    
    setTimeout(()=>{
        const data = {id: 1, name: 'Alex'}
        funcBack(data)
    }, 1000);
}

function getGameUser (id, game){
    setTimeout(()=>{
        const data = ['game1', 'game2']
        game(data)

        
    }, 1000);
}

function viewServerFetch (){
    getServer((data)=>{
        console.log(data);
        getGameUser(data.id, (userGames)=>{
            console.log(userGames);
            
        })
    })
}
viewServerFetch()
