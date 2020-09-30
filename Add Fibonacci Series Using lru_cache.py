from functools import lru_cache ## 
@lru_cache(maxsize=10000) ## lru_cache is library making calculation for program more faster and effecient
def fib(n): ## i am Creating A New Libarry so that basics Calculation can be memorised by the library
    if n==1:
        return 0
    elif n==2:
        return 1
    else:
        x=fib(n-1)+fib(n-2)
        return x
n=int(input("Enter Number Less Than 1000: "))
for i in range(1,n+1):
    print(fib(i),end=" ")
    print()
print("To change the maxsize Change the max Size In Line 2 of the Code", end=" Thank You")
## Now for Any Value Whose size is Mentioned Above In Library, the calculation and output
## effeciency is faster than usual Programs. Must use And Every Programmer Should Konw It.
