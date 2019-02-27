function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    // Ran every time a balls drops into a bucket
}

function runAnalysis()
{
    const testSetSize = 100
    const [testSet, trainingSet] = splitDataSet(outs, testSetSize)
    _.range(1, 20).forEach(k =>
    {
        const accuracy = _.chain(testSet)
            .filter(testPoint => knn(trainingSet, testPoint[0], k) === testPoint[0])
            .size()
            .divide(testSetSize)
            .value()
        console.log('For k of', k, 'accuracy is', accuracy)
    })
}

function knn(data, point, k)
{
    return _.chain(data)
        .map(row => [distance(row[0], point), row[3]])
        .sortBy(row => row[0])
        .slice(0, k)
        .countBy(row => row[1])
        .toPairs()
        .sortBy(row => row[1])
        .last()
        .first()
        .parseInt()
        .value()
}