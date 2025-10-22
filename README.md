# 🎯 Image Spinner Widget - SAP Analytics Cloud

Um Custom Widget para SAP Analytics Cloud que exibe uma imagem giratória como loading spinner.

## 📁 Estrutura do Projeto

```
ImageSpinnerWidget/
├── README.md                    # Esta documentação
├── ImageSpinnerWidget.json      # Metadados do widget
├── ImageSpinnerWidget.js        # Componente principal
├── ImageSpinnerWidget_Builder.js # Interface de configuração
├── Alex.jpeg                    # Imagem do spinner
├── test_sap_widget.html         # Página de teste
└── .gitignore                   # Arquivos ignorados pelo Git
```

## 🚀 Instalação no SAP Analytics Cloud

### 1. Hospedar no GitHub

```bash
# 1. Criar repositório no GitHub
# 2. Fazer upload dos arquivos
# 3. Atualizar URLs no JSON
```

### 2. URLs Necessárias

Após hospedar no GitHub, atualize as URLs no `ImageSpinnerWidget.json`:

```json
{
  "webcomponents": [
    {
      "kind": "main",
      "tag": "com-sap-custom-image-spinner-widget",
      "url": "https://raw.githubusercontent.com/SEU-USUARIO/ImageSpinnerWidget/main/ImageSpinnerWidget.js",
      "integrity": ""
    },
    {
      "kind": "builder",
      "tag": "com-sap-custom-image-spinner-widget-builder", 
      "url": "https://raw.githubusercontent.com/SEU-USUARIO/ImageSpinnerWidget/main/ImageSpinnerWidget_Builder.js",
      "integrity": ""
    }
  ]
}
```

### 3. Registrar no SAC

1. Acesse **SAP Analytics Cloud**
2. Vá para **Analytic Applications** → **Custom Widgets**
3. Clique no **+** e selecione `ImageSpinnerWidget.json`
4. O widget será registrado e estará disponível

## ⚙️ Propriedades Configuráveis

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `imageUrl` | string | URL da imagem para o spinner |
| `spinnerSize` | number | Tamanho do spinner em pixels |
| `rotationSpeed` | number | Velocidade de rotação em segundos |
| `showText` | boolean | Mostrar texto de loading |
| `loadingText` | string | Texto exibido durante loading |
| `backgroundColor` | string | Cor de fundo do overlay |
| `loadingDuration` | number | Duração do loading em ms |

## 🎮 Eventos

- **`loadingStart`** - Disparado quando o loading inicia
- **`loadingComplete`** - Disparado quando o loading é concluído

## 🔧 Métodos Públicos

```javascript
// Iniciar loading
widget.startLoading();

// Parar loading
widget.stopLoading();

// Definir duração customizada
widget.setLoadingDuration(5000);

// Reiniciar widget
widget.restart();
```

## 🧪 Teste Local

1. Abra `test_sap_widget.html` no navegador
2. Use os controles para testar configurações
3. Verifique o log de eventos

## 📋 Comandos Git

```bash
# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "SAP Analytics Cloud Image Spinner Widget"

# Conectar com GitHub
git remote add origin https://github.com/SEU-USUARIO/ImageSpinnerWidget.git

# Push para GitHub
git branch -M main
git push -u origin main
```

## 🔗 Links Úteis

- [SAP Analytics Cloud Documentation](https://help.sap.com/docs/analytics_cloud)
- [Custom Widgets Guide](https://help.sap.com/docs/analytics_cloud/custom-widgets)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## 📝 Licença

MIT License - Livre para uso comercial e modificação.

---

**Desenvolvido para SAP Analytics Cloud** 🚀
