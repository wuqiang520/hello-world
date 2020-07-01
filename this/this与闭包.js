var obj = {
  a: 1,
  foo: function(b) {
      b = b || this.a
      return function(c) {
          console.log(this.a + b + c)
      }
  }
}
var a = 2
var obj2 = {
  a: 3
}

obj.foo(a).call(obj2, 1)   // 3+2+1 = 6
obj.foo.call(obj2)(1)    // 2+3+1 = 6

// 存在闭包 b的值不释放

// obj.foo(a).call(obj2, 1)    obj.foo(2)  this指向 obj, 此时this.a = 1; b=b||this.a => b = 2||1 所以b=2
// f.call(obj2,1)        this指向obj2, 此时this.a = 3; c=1 ;  所以 this.a+b+c = 3+2+1 = 6


// obj.foo.call(obj2)    未传参 b=undefined  this指向obj2 此时this.a = 3; b=undefined||3  所以 b=3
// f(1)     this指向window c=1   所以 this.a+b+c = 2+3+1 = 6；