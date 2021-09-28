const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const list = [1, 2, 3, 4]
const doSomething = async() => {
  for (const item of list) {
      console.log('🦄: ' + item)    
      await sleep(500)
  }
  console.log("checking...")
}

doSomething()
