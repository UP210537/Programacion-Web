function getUsers(callback) { /*Regresera una lista de datos despues de 2 seg*/
    setTimeout(() => {
        const users =[
            {name: "rogelio", years: 22},
            {name: "luis", years: 30 }
        ];

        callback(users);
    }, 200);
}

function getUsersWithPromise() {
    const promise = new Promise((resolve, reject) => { /*son callbacks/funciones el resolver y el reject*/
    setTimeout(() => {
        const users =[
            {name: "rogelio", years: 22},
            {name: "luis", years: 30 }
        ];

        resolve(users);
    }, 200);
    });
    return promise;
}

/*Pedirle la info dependiendo del nombre*/
function getInfo(name, callback) {
    setTimeout(() => {
        let error = null;
        const saludo = "Hola " + name + ", como estas?";
        
        if (name === 'rogelio'){
        error = new Error("Está mal la persona")
        }
        
        callback(saludo, error)
    }, 5000);
}

function getInfoWithPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const saludo = "Hola " + name + ", como estas?";
            
            if (name === 'rogelio'){
            reject(new Error("Está mal la persona"));
            } else{
                resolve(saludo) /*Siempre se tiene que acabar con uno, con el resolve o con el reject*/
            }
        }, 5000);
    });
}

/*Recorre la lista (array)*/
getUsers((users) => {
    for (let i = 0; i < users.lenght; i++) {
        getInfo(users[i].name, (saludo, error) => {
            if (error !== null) {
                console.log("Hay un error: ", error);
            } else {
                console.log(saludo);
            }
        });
    }
});

getUsersWithPromise()
    .then((users) => {
        let newResponses = [];
        for (let i=0; i < users.lenght; i++) {
            newResponses.push(getInfoWithPromise(users[i].name))
        }

        console.log(newResponses)

        return Promise.allSettled(newResponses);
    }) /*Si todo salio bien, en mi then va a salir toda mi info*/
        .then((info) => {
            console.log(info);
        })
        .catch((error) => {
            console.log("error en la promesa: ", error)
        });

        async function main() {
            let users = await getUsersWithPromise();

            for (let i = 0; i < users.lenght; i++) {
                try {
                    let saludo = await getInfoWithPromise(users[i].name);
                    console.log(saludo);
                } catch (error) {
                    console.log(error);
                }
            }
        }


       main(); 
