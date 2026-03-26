if(exec 'lyte' build --production)
then
    zip -r dist.zip dist/
else
    echo 'Failed'
fi