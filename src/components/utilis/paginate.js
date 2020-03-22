import _ from 'lodash'

export function paginate(items, actualPage, pageSize) {
    const startIndex = (actualPage - 1) * pageSize
    return _(items).slice(startIndex).take(pageSize).value();
}