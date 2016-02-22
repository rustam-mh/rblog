String::each = (number)->
    str=''
    for i in [1..number] then str+=@valueOf() 
    str

console.log '5'.each(10)
