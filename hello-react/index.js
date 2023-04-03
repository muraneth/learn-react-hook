
const h1 =  document.createElement("h1")
h1.innerText = "hello"
document.getElementById("root").appendChild(h1)



ReactDOM.render(h1,document.getElementById("root"));
ReactDOM.render(<h1>Hello React!</h1>,document.getElementById("root"))