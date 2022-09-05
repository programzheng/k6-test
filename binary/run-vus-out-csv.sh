scriptName=$(basename "$1" ".js")
k6 run --vus 100 --duration 30s --out csv=$PWD/out/"${scriptName}_$(date +"%Y%m%d%H%M%S")".csv - <$1