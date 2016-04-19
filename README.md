# Pager
Automatically generate an entire input form simply by passing the data you wish to receive. 

Pass in an array of the names of the values you wish to secure in your multi-page form.

'var data = [{'name': 'First Name'},{'name','Last Name'}];'

Choose how many inputs you want per page

'var inputsPerPage = 3;'

Create a new Pager object right in your markup, and let Pager do all the work!

'var pager = new Pager(data, inputsPerPage);'

