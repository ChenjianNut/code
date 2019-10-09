new Vue({
    el:"#app",
    data() {
        return {
        // 添加数据时用来暂存数据的
          userInfo:{
              name:'',
              gender: '',
              phoneNumber:'',
              birthday:''
          },
        //   表格用来显示数据
          tableData:[],
        //   编辑数据时用来暂存数据的
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
    mounted() {
        this.init();
    },
    methods: {
        init(){
            // 请求数据
            axios({url:"http://localhost:3000/classmate"})
                .then(res=>{
                    this.tableData=res.data;
                })
        },
        // 增加联系人
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
            // 增加一个新的联系人
            axios({
                url:'http://localhost:3000/classmate',
                method:"post",
                data:{
                    name:this.userInfo.name,
                    gender: this.userInfo.gender,
                    phoneNumber:this.userInfo.phoneNumber,
                    birthday:this.userInfo.birthday
                }
            }).then(res=>{
                // 得到的data是刚刚新增加的对象一个对象
                this.tableData.push(res.data);
            })

            this.userInfo={
                name:'',
                gender: '',
                phoneNumber:'',
                birthday:''
            };
        },
        // 删除数据
        delUser(row,idx){
            let num=row.id;
            this.$confirm('确认删除？')
                .then(_ => {
                    axios({
                        url:'http://localhost:3000/classmate/'+num,
                        method:"delete"
                    }).then(ref=>{
                        if(ref.status==200){
                            this.tableData.splice(idx,1);
                        }
                        
                    }).catch(_=>{
                        console.log("删除失败");
                    })
                })
                .catch(_ => {});
        },

        handleClose(){
            this.dialogVisible=false;
        },
        //修改联系人
        editUser(item){
            this.dialogVisible=true;
            //之前传入的是表格前面的序号，现在传入每个数据的id号
            this.userIndex=item.id;
            this.editor={
                name:item.name,
                gender: item.gender,
                phoneNumber:item.phoneNumber,
                birthday:item.birthday,
            }
        },
        // 提交修改
        confirm(){
            this.dialogVisible=false;
            axios({
                url:'http://localhost:3000/classmate/'+this.userIndex,
                method: 'patch',
                data:{
                    name:this.editor.name,
                    gender: this.editor.gender,
                    phoneNumber:this.editor.phoneNumber,
                    birthday:this.editor.birthday,
                }
            }).then(res=>{
                if(res.status===200){
                    this.init();
                }
            }).catch(()=>{
                console.log("修改失败");
            })

        },
    },
})