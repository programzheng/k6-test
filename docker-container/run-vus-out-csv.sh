scriptName=$(basename "$1" ".js")
docker run --rm -i -v "$PWD/out:/out" grafana/k6 run --vus 10 --duration 2s --out csv=/out/"${scriptName}_$(date +"%Y%m%d%H%M%S")".csv - <$1