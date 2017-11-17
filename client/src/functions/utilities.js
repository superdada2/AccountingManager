import * as jsonexport from 'jsonexport/dist'

export function handleExport (data) {
  jsonexport(data, (err, csv) => {
    if (err) return console.log(err)
    var uriContent =
      'data:application/octet-stream,' + encodeURIComponent(csv)
    var link = document.createElement('a')
    link.setAttribute('href', uriContent)
    link.setAttribute('download', 'Report.csv')
    document.body.appendChild(link) // Required for FF

    link.click()
    this.$message({
      type: 'success',
      message: 'Success'
    })
  })
}
