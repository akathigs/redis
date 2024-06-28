import User from "../models/User.js"

class UserRepository{
    async create(data){
        const user = new User(data)
        await user.save()
        return user
    }

    async findAll(){
        return User.find()
    }
    
    async findById(id){
        return User.findById(id)
    }

    async updateById(id, data){
        return User.findByIdAndUpdate(id, data, {new:true})
    }

    async deleteById(id){
        return User.findByIdAndDelete(id)
    }
}

const userRepositories = new UserRepository()
export default userRepositories