### Manual

`kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf`
`kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=enterstripekeyhere`

### Ingress Nginx

`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml`
`kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission`
