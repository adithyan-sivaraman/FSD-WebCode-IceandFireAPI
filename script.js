
// Display around 10 books.
// Display the name and isbn of each book.
// Display the number of pages in the book.
// Also display the authors of the book.
// Display the publisher name and the released date.
// Also display at least 5 characters for each book


async function books() {
    try{
        
       
        var row = document.createElement("div")
        row.className = "row";
        row.id="data"
        document.querySelector(".container").append(row)

        const url = "https://www.anapioficeandfire.com/api/books"; 
        const request = await fetch(url); // make fetch api request
        const response = await request.json(); // get response in json
      
       
        response.forEach(async (values,index)=>{
        var bookName = values['name'];                            //get book name
        var author = values['authors'];                                 //get author name
        var isbn = values['isbn'];                                           //get isbn
        var pages = values['numberOfPages'];                 //get page numbers
        var released = values['released'].split("T")[0];    //get released and split into array to get date alone
        var [year,month,day] = released.split("-")          //get year month and date from split array
        var publisher = values['publisher'];                    //get publisher name
        var actors = values['characters'].slice(0, 15);   //get the first 20 url of actors from array

         
            
            async function fetchNames() {

               try{
                var actorNames = await Promise.all(     //using promise all so that the values are pushed into array before next fetch request
                actors.map(async (actUrl) => {
                  let url = actUrl;
                  let req = await fetch(url);
                  let res = await req.json();
                  let name = res['name']
                  return name;
                })
              );
          
              let actNames = actorNames.filter((name) => 
              name.trim() !== ""); //filter only the names which are not blank
              let nameStr = actNames.slice(0,5).join(",");
            
          
             
              row.innerHTML += `
                <div class="col-md-4" >
                    <div class="card border-primary mb-3" style="max-width: 28rem ;height:420px">
                    <div class="card-header nav">${bookName}</div>
                    <div class="card-body border border-primary rounded" id="${'card'+parseInt(index+1)}">
                        <p class="card-text"><b>Author</b>: <span>${author}</span></p>
                        <p class="card-text"><b>ISBN:</b> <span>${isbn}</span></p>
                        <p class="card-text"><b>No of Pages:</b> <span>${pages}</span></p>
                        <p class="card-text"><b>Released:</b> <span>${day+'/'+month+'/'+year}</span></p>
                        <p class="card-text"><b>Publisher:</b> <span>${publisher}</span></p>
                        <p class="card-text"><b>Characters:</b> <span>${nameStr}</span></p>
                    </div>
                    </div>
                </div>
              `;
               }
               catch(error){
                console.log(error)
               }
                
            }
    
            fetchNames()
      
    
        
        });
    }
    catch(error){
        console.log(error)
    }
  
  }
  
function createDom(){
    var container = document.createElement("div");
    container.className = "container";

    var top = document.createElement("div");
    top.id="topbar"
    top.innerHTML=`
    <h1>Game of Thrones - Ice and Fire</h1>
    <h5>Quote :-"A book is a gift you can open again and again"</h5>
    `
    var search = document.createElement("div");
    var input = document.createElement("input");
    input.type = "text";
    input.id = "search";
    input.placeholder = "Enter text to search"
   

    input.addEventListener("input",()=>{                        //add event listener for search field
        let container = document.querySelector('.container')   
    let value = input.value.toLowerCase(); //convert input value to lowercase
    var span = container.querySelectorAll("span,div"); //get all the span and card header elements inside the container div
        
    span.forEach((e)=>{
        let text = e.textContent.toLowerCase(); //convert text content to lowercase
       
            if(value.length>0){
                if(text.search(value)>=0){        //use string search to find whether text content matches input value
    
                        e.style.color = "orange"   // if matched change text color to orange and font to bold
                        e.style.fontWeight = "bold"
            
                }
                else {
                    e.style.color="black"  // if not matched change text color to black and font to normal
                    e.style.fontWeight = "normal"
                }
            }
            else {
                e.style.color="black"  // if no value entered  change text color to black and font to normal
                e.style.fontWeight = "normal"
            }
        
    })

    })

    search.append(input)
   document.body.append(top)
   document.body.append(search)

    document.body.append(container)
}

createDom()
books();