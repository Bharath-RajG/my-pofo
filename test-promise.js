function add(a, b){
    return new Promise(function (resolve, reject){
        if(typeof a != 'number'){
            reject('Pass a number')
        }else{
            resolve(a+b)
        }
    })
}
function square(n){
    return new Promise(function (resolve, reject){
        if(typeof n != 'number'){
            reject('Square is not possible with string value')
        }else{
            resolve(n*n)
        }
    })
}


add(1,2)
          .then(data => square(data))
          .then(sq => square(sq))
          .then(doubleSq => console.log(doubleSq))
          .catch(err =>{
              console.log(err)
          })