import mongoose, { mongo } from "mongoose";
import { number } from "zod";


const userSchems=new mongoose.Schema({
   user_full_name:{
    type:"String",
    required:true,
    trim:true
   },
   email:{
    type:"String",
    required:true,
    trim:true,
    unique:true
   },
   token:{
    type:"String",
    trim:true
   },
  trip_id:{
    type:"referance of the trip model",
  },
  intrestedVisitPlace:{
    type:"String",

  },
  AllowedNotiofication:{
    [
        whatsspp,push notifarion,email
    ]
  },
  user_id:{
    it will created automatic if user dont have usin uuid
  },
 upi_id:{
    type:"String",
 },
 QR_Code_image:{

 }
   
})


const User=mongoose.models(userSchems)



const tripSchem=mongoose.Schema({
    trip_name:{
        type:string,
       required:true
    },
    trip_start_date:{
        type:Date()
        required:true
    },
    trip_end_date:{
        type:Date()
        required:true
    },
    category:{

    },
    members_id:[],
    trip_cover_image:{

    }
    
})

const Trip=mongoose.modelNames(tripSchem)





const expenseSchems=new mongoose.Schema({
    expensse_title:{
        type:"String",
        required:true,
        trim:true
    },
    amount:{
        type:number,
        required:true
    },
    category:{
        type:"String"
    },
    paid_by_id:{
        type:"String",
        required:true
    },
    split_between:{
        members:[
            {
                name:{
                    type:string,
                    required
                },
                user_id:{
                    type:string,
                    required:true
                },
                amount:{
                    type:number
                }
            }
        ]
    },
    bill_image:{
        type:"String",

    }
    
})



const Expense=mongoose.models(expenseSchems);




const settlementSchems=new mongoose({
    trip_id:{
        type:trip model referenace
    },
    settlement_amount:[
        {
            sender:
            {
                name:"string",
                user_id:user models referance,
                amount:number
            },
            reciever:{
                name:"string",
                user_id:user models referance,
                amount:number

            },
            status:"Paid" || pending
        }
    ]
    tripe_cost:{
        type:number,

    },
    percent:{

    }
})


const Settlement=mongoose.models(settlementSchems)




const chatSchema=mongoose.Schema(
    tripId:trip models referance,
    message:{
        [
            {
                sendee_id:user models referance
               name:"skldfndsklnf",
               text:sdklfmdsklnfkls,
               file:"url",
            },



        ]
    }
)

const  Chat=mongoose.models(chatSchema)