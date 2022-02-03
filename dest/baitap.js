/* ============================================== */

// bài 1 chia lấy dư
totalint = (a = 4, b = 12) => {
    console.log("chia lay phan nguyen cua a/b = ", (a / b));
    console.log("chia lay phan du cua a%b = ", (a % b));
    //callback it? using - total(a, b);
    //default input a = 4 b = 12
}

// bài 2 in ra họ tên
callname = (string) => {
    let fullname = new String(string);
    console.log("ho va ten cua ban la ", fullname.toString());
    // new String it is a Object , cho dù ép kiểu data thì nó vẫn là 1 Object 
    // nhưng nó lấy được chuỗi
}

// bài 3 in ra length của string
totalstr = (index) =>{
    let strmain = new String(index); // 1 Object
    let strreplace = String("son toilet"); // 1 string

    for(let strl = 0; strl < index.length; strl++){ console.log(strl); } // check index list string
    console.log(strmain.toString(), strmain.indexOf("y"));
    console.log(strmain.toString(), strmain.lastIndexOf("y"));
    console.log(strmain.replace(strreplace));
    // sao cái replace nó bị gì á anh chỉ em sửa với ạ
}

// bài 4 check number chẵn & lẽ
eventnumber = (a, b) => {
    if(a %2 == 0){ console.log("True") }
        else { console.log("false") }
}

// bài 5 run loop for
numberloop = () => {

    let a;
    for(let n = 0; n < 10; n++){
        if(a === n) a++;
        console.log("số vòng lập là = ", n);
    }
    console.log("tính tổng đã cộng là  = ", a)
}

// bài 6 in ra số chẵn el4
printnumber = () => {
    for(let n = 0; n <= 20; n++){
        // chia lấy dư , thỏa man == 0
        if(n % 2 == 0) console.log("số ", n + " là số chẵn");  
        else console.log("số ", n + " là số lẽ");        
    }
}

// bài 7 
/*
    var = variable (biến), nó là 1 global scope khi sử dung toàn cục thì chúng ta sẽ sử dụng nó,
        nó sẽ chiếm nhiều tài nguyên hơn, khi gọi ở ngoài phạm vi { } thì var vẫn work bình thường
        sử dụng lúc cần khai báo toàn cục ko nhất thiết phải bên trong local { }

    let = let chứ = gì , nó là 1 block scope , nó là 1 kiểu khai báo mới của Javascript
        nó sẽ chiếm ít tài nguyên hơn so với var vì nó nằm trong local { }
        sử dụng lúc cần khai báo 1 data gì đó chỉ nằm bên trong { }

    const = const :V , nó là 1 biến không thể thay đổi giá trị nó cũng là 1 block scope giống let,
        nó sử dụng thích hợp khi ta cần 1 biến không cần thay đổi giá trị trong 1 case nào có thể bug
        còn refenfer gì đó em quên rồi em chả bik luôn
*/

// bài 8 khỏi tạo 1 array có 5 element rmove 2 array last
createarray = () =>{
    let array = new Array("Son", "code", "trong", "toilet", "huhu");
    console.log(array, "array remove " + array.splice(3, 2));
}


// bài 9 



