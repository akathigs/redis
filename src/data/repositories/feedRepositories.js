import Feed from '../models/Feed.js';

class FeedRepository {
    async create(data) {
        const feed = new Feed(data);
        await feed.save();
        return feed;
    }

    async findAll() {
        return Feed.find();
    } 

    async findByOwner(owner) {
        return Feed.find({ owner });
    }
    async updateById(id, data) {
        return Feed.findByIdAndUpdate(id, data, {
            new: true,
        });
    }
    async deleteById(id) {
        return Feed.findByIdAndDelete(id);
    }
}

const feedRepositories = new FeedRepository();
export default feedRepositories;