// Data Fetch :
async function main(url){
    try{
        let dataset = await fetch(url);
        if(!dataset.ok){
            throw new Error("Error On Fletching Data");
        }
        let promiseData = await dataset.json();

        return promiseData;
    }catch(error){
        console.log(error);
    }
}


async function garb(){
    main("https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata").then((profitData)=>{
        listData(profitData);
})
}
garb();

// Chart Code :
let lineGraph = document.querySelector("#myChart").getContext("2d");

// Default Plugins :
Chart.defaults.plugins.legend = false;
Chart.defaults.borderColor = false;

// Custom Plugin :
const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };


// Chart Configuration :
let stow = new Chart(lineGraph,{
    type:"line",

    data:{
        labels:['8/1/2018', '9/1/2018', '10/1/2018', '11/1/2018', '12/1/2018', '1/1/2019', '2/1/2019', '3/1/2019', '4/1/2019', '5/1/2019', '6/1/2019', '7/1/2019', '8/1/2019', '9/1/2019', '10/1/2019', '11/1/2019', '12/1/2019', '1/1/2020', '2/1/2020', '3/1/2020', '4/1/2020', '5/1/2020', '6/1/2020', '7/1/2020', '8/1/2020', '9/1/2020', '10/1/2020', '11/1/2020', '12/1/2020', '1/1/2021', '2/1/2021', '3/1/2021', '4/1/2021', '5/1/2021', '6/1/2021', '7/1/2021', '8/1/2021', '9/1/2021', '10/1/2021', '11/1/2021', '12/1/2021', '1/1/2022', '2/1/2022', '3/1/2022', '4/1/2022', '5/1/2022', '6/1/2022', '7/1/2022', '8/1/2022', '9/1/2022', '10/1/2022', '11/1/2022', '12/1/2022', '1/1/2023', '2/1/2023', '3/1/2023', '4/1/2023', '5/1/2023', '6/1/2023', '7/1/2023', '7/21/2023'],

        datasets:[
            {
        label: "AAPL",
        data: [54.4, 54.1, 52.5, 42.8, 38, 40, 41.7, 45.9, 48.5, 42.3, 48, 51.7, 50.6, 54.5, 60.6, 65.1, 71.7, 75.6, 66.8, 62.2, 71.9, 77.8, 89.5, 104.3, 126.7, 113.9, 107.1, 117.1, 130.7, 130, 119.5, 120.5, 129.7, 123, 135.4, 144.2, 150.1, 140.1, 148.3, 163.6, 176, 173.3, 163.7, 173.3, 156.5, 147.7, 135.9, 161.5, 156.3, 137.6, 152.6, 147.4, 129.6, 143.9, 147, 164.7, 169.4, 177, 194, 193.1, 193],
            }
        ],

    },
    options : {

        color:"red",

        responsive:false,
         
        // plugins:false,

        animation:false,

        borderColor:"rgb(136, 218, 13)",

        scales:{
            x:{
                display:false,
            },
            y:{
                display:false,
            }
        },
        plugins: {
            customCanvasBackgroundColor: {
              color: ' rgb(3, 3, 77)',
            }
          },
          interaction: {
            intersect: false,
            mode: 'index',
        },

        },
        plugins: [plugin,
            {
                afterDraw: chart => {
                    if (chart.tooltip?._active?.length) {
                        let x = chart.tooltip._active[0].element.x;
                        let yAxis = chart.scales.y;
                        let ctx = chart.ctx;
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(x, yAxis.top);
                        ctx.lineTo(x, yAxis.bottom);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'grey';
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        ],
    })


    // End :



    // Function For List Details :

    let stocksDiv = document.querySelector(".stockDta");

    function listData(profitData){

        let count = 1;

        let stockObjects = profitData.stocksStatsData[0];

        for(let i in stockObjects){
            if(i!== "_id"){
            let substockDiv = document.createElement("div");
            substockDiv.setAttribute("class","substockDiv");

            let stockBtn = document.createElement("button");

            let stockpara1 = document.createElement("p");

            let stockpara2 = document.createElement("p");

            stockBtn.textContent = i;

            stockpara1.textContent = `$${stockObjects[i].bookValue.toFixed(3)}`;

            stockpara2.textContent = `${stockObjects[i].profit.toFixed(2)}%`;

            let para2Content = `${stockObjects[i].profit}%`;

            (i=="TSLA" || i=="NFLX")? stockpara2.style.color = "red": false;

            stockBtn.addEventListener("click",(()=>{
                chartData(stockBtn.textContent,"5y");
                stockTitle(stockBtn.textContent,para2Content,stockpara1.textContent)
            }))

            substockDiv.appendChild(stockBtn);
            substockDiv.appendChild(stockpara1);
            substockDiv.appendChild(stockpara2);

            stocksDiv.appendChild(substockDiv);
        }
        }
         let stocksArr = stocksDiv.querySelectorAll("div");

         stocksArr.forEach((current)=>{
            setTimeout(() => {
            current.style.display ="flex"
            },500 * count);
            count++;
         })
    }
    




    // Event for Time Duration Buttons :
    let timeDurBtn = document.querySelectorAll(".btnDiv button");
    timeDurBtn.forEach((btn)=>{
        btn.addEventListener("click",function(){
            if(btn.textContent == "1 Month"){
                let stockBtn = stow.data.datasets[0].label;
                chartData(stockBtn,"1mo");
            }else if(btn.textContent == "3 Month"){
                let stockBtn = stow.data.datasets[0].label
                chartData(stockBtn,"3mo");
            }else if(btn.textContent == "1 Year"){
                let stockBtn = stow.data.datasets[0].label
                chartData(stockBtn,"1y");
            }else if(btn.textContent == "5 Year"){
                let stockBtn = stow.data.datasets[0].label
                chartData(stockBtn,"5y");
            }else{
                console.log("Invalid Time Duration")
            }
    })
    })






    // Function for Chart Data :
    let para1 = document.querySelector(".p1");

    let para2 = document.querySelector(".p2");

    let para3 = document.querySelector(".p3");

    let para4 = document.querySelector(".p4");

  async  function chartData(stockBtn,intervel,stockPercen,stockPrice){

        let yaxisData = [];
        let xaxisData = [];

    let dataStore = await main("https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata").then((profitData)=>{
            return profitData;
    })

    let dataArr = dataStore.stocksData[0];
    console.log(dataArr);

    for(let i in dataArr){
      if(i!=="_id" && i==stockBtn){
          let yaxis = dataArr[i][intervel].value;
          let xaxis = dataArr[i][intervel].timeStamp;
    
    
          yaxis.forEach((value)=>{
           let fixedData = Number(value.toFixed(1));
           yaxisData.push(fixedData);
          })

          xaxis.forEach((value)=>{
           let fixedData = new Date(value * 1000).toLocaleDateString();
           xaxisData.push(fixedData);
          })
      }
  }
  stow.data.datasets[0].data = yaxisData;
  stow.data.labels = xaxisData;
  stow.data.datasets[0].label = stockBtn;
  stow.update()
}


//Function for stockTitle and price Update:
async  function stockTitle(stockBtn,percentage,price){

    let dataStore2 = await main("https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata").then((summaryData)=>{
        return summaryData;
    })

    para1.textContent = stockBtn;

    para2.textContent = percentage;

    para3.textContent = price;

    let sumArr = dataStore2.stocksProfileData[0];

    for(let i in sumArr){
        if(i!=="_id" && i==stockBtn){
            para4.textContent = sumArr[i]["summary"];
        }
    }
}