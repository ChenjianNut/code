new Vue({
    el:"#app",
    data() {
        return {
           tableData:[
            {
            product:'华为p30',
            price:8848.9999,
            count:0,
            totalPrice:0,
            },
            {
            product:'iphone11',
            price:9000,
            count:0,
            totalPrice:0,
            },
            {
            product:'三星',
            price:7788.9,
            count:0,
            totalPrice:0,
            },
            {
            product:'小米',
            price:5000.99,
            count:0,
            totalPrice:0,
            },
        ],
        dialogVisible:false,
        expensive:0,
        goods:'',
        }  
    },
    methods: {
        addCount(item,idx){
            this.tableData[idx].count+=1;
            this.tableData[idx].totalPrice=this.tableData[idx].count*this.tableData[idx].price;
        },
        deleCount(item,idx){
            if(item.count>0){
                this.tableData[idx].count-=1;
                this.tableData[idx].totalPrice=this.tableData[idx].count*this.tableData[idx].price;
            }
            return ;
        },  
        // 统计结果
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];

            columns.forEach((column, index) => {
              if (index === 0) {
                sums[index] = '总价';
                return;
              }
              const values = data.map(item => Number(item[column.property]));
              if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                if(index===3){
                    this.expensive=sums[index].toFixed(2);
                }
                sums[index] = '￥'+sums[index].toFixed(2)+"元";
              } else {
                sums[index] = '#';
              }
            });
    
            return sums;
          },
          handleClose(){
              this.dialogVisible=false;
          },
          gotoBuy(){
            this.dialogVisible=true;
            this.goods='',
            this.tableData.map(item=>{
                if(item.count!=0){
                    this.goods+=item.product+"  ";
                }
            })
          },
          confirm() {
            this.$confirm('即将进入支付页面, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '购买成功!' 
              });
                this.dialogVisible=false;
                this.tableData.map(item=>{
                    item.count=0;
                    item.totalPrice=0;
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已退出支付！'
              });          
            });
            
        }
        
    },
    filters:{
        // 给总价保留两位小数
        filterMoney(val){
            return  "￥"+val.toFixed(2)+"元";
        }
    }
})