### Manual

`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`

### Ingress Nginx

`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml`
`kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission`
