Deploying base metrics service (one time only):
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

Fix for metrics server:

kubectl -n kube-system patch deployment metrics-server --type=json \
-p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]]'

Then restart it by running:
kubectl rollout restart deployment metrics-server  -n kube-system

Deploying Frontend and Backend:
kubectl apply -f auto_backend_dep.yaml
kubectl apply -f auto_frontend_dep.yaml

Creating HPA service for both:
kubectl autoscale deployment frontend --min=<Desired_Min_Pods> --max=<Desired_Max_Pods> --cpu-percent=<Desired_CPU_Percentage>
kubectl autoscale deployment backend-auto --min=<Desired_Min_Pods> --max=<Desired_Max_Pods> --cpu-percent=<Desired_CPU_Percentage>