"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepositoryAbstract = void 0;
class BaseRepositoryAbstract {
    constructor(model) {
        this.model = model;
        this.model = model;
    }
    async create(dto) {
        const created_data = await this.model.create(dto);
        return created_data.save();
    }
    async findById(id) {
        return await this.model.findById(id);
    }
    async findOne(condition = {}) {
        return await this.model.findOne(condition).exec();
    }
    async findAll(condition, options) {
        const [count, items] = await Promise.all([
            this.model.countDocuments({ ...condition, deleted_at: null }),
            this.model.find({ ...condition, deleted_at: null }, options?.projection, options),
        ]);
        return {
            count,
            items,
        };
    }
    async update(id, dto) {
        return await this.model.findOneAndUpdate({ _id: id, deleted_at: null }, dto, { new: true });
    }
    async softDelete(id) {
        const delete_item = await this.model.findById(id);
        if (!delete_item) {
            return false;
        }
        return !!(await this.model
            .findByIdAndUpdate(id, { deleted_at: new Date() })
            .exec());
    }
    async permanentlyDelete(id) {
        const delete_item = await this.model.findById(id);
        if (!delete_item) {
            return false;
        }
        return !!(await this.model.findByIdAndDelete(id));
    }
}
exports.BaseRepositoryAbstract = BaseRepositoryAbstract;
//# sourceMappingURL=base.abstract.repo.js.map