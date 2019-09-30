new Vue({
    el:"#app",
    data() {
        return {
          userInfo:{
              name:'',
              gender: '',
              phoneNumber:'',
              birthday:''
          },
          tableData:[
            {
            name:'狗子',
            gender: '公',
            phoneNumber:'1234324',
            birthday:'2019-1-1'
            }
          ],
          editor:{
            name:'',
            gender: '',
            phoneNumber:'',
            birthday:''
        },
          dialogVisible:false,
          userIndex:0,
        
        }
    },
    methods: {
        addUser(){
            if(!this.userInfo.name){//添加校验
                this.$message({
                    message:'请输入姓名',
                    type:"warning",
                })
                return ;
            }
            if(!this.userInfo.gender){
                this.$message({
                    message:'请输入性别',
                    type:"warning",
                })
                return ;
            }
            if(!/^1[3456789]\d{9}$/.test(this.userInfo.phoneNumber)){
                this.$message({
                    message:'请输入正确的 电话号码',
                    type:"warning",
                })
                return ;
            }
            if(!this.userInfo.birthday){
                this.$message({
                    message:'请输入生日',
                    type:"warning",
                })
                return ;
            }
            this.tableData.push(this.userInfo);
            this.userInfo={
                name:'',
                gender: '',
                phoneNumber:'',
                birthday:''
            };
        },
        // 删除数据
        delUser(idx){
            this.$confirm('确认删除？')
                .then(_ => {
                    this.tableData.splice(idx,1);
                })
                .catch(_ => {});
           
        },
        handleClose(){
            this.dialogVisible=false;
        },
        editUser(item,ind){
            this.dialogVisible=true;
            this.userIndex=ind;
            this.editor={
                name:item.name,
                gender: item.gender,
                phoneNumber:item.phoneNumber,
                birthday:item.birthday,
            }
        },
        confirm(){
            this.dialogVisible=false;
            // 下面确定可以修改数据，但是却不能及时把数据渲染到页面上面去
            // 数据更新检查部分-》注意事项
            // this.tableData[this.userIndex]=this.editor; 
            Vue.set(this.tableData,this.userIndex,this.editor);

        },
    },
})