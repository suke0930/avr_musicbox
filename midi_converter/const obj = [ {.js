const obj = [{
    ticks: 400,//t1
    durationTicks: 2361//d1
},
{
    ticks: 1000,//t2
    durationTicks: 774//d2
}];

const X = obj[0].ticks + obj[1].durationTicks
console.log(X);
console.log(X - obj[1].ticks - X);

if (obj[0].ticks + obj[0].durationTicks > obj[1].ticks) {
    const result = obj[1].ticks - obj[0].ticks;
    console.log(result)
    console.log(obj[0].ticks + result)
};