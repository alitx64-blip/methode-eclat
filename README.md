# Mon parcours ÉCLAT — D’Âme & de Sens

Version autonome de l’application : elle s’adresse directement à la personne et la guide sans nécessiter la présence d’un praticien. Le parcours suit six mouvements : Épreuve actuelle, Corps et émotions, Liens et répétitions, Axe essentiel, Trésor révélé et Ancrage.

## Confidentialité

Les réponses sont enregistrées dans le stockage local du navigateur. La synthèse ÉCLAT native fonctionne entièrement sans service externe.

Une synthèse approfondie facultative peut être demandée à la fin du parcours. Dans ce cas seulement, les réponses utiles — sans le nom de la personne — transitent par une fonction Cloudflare vers un modèle OpenRouter explicitement gratuit. La fonction ne conserve pas les réponses et exige un fournisseur sans collecte de données et compatible Zero Data Retention. En cas d’indisponibilité, la synthèse native reste affichée.

## Publication Cloudflare Pages

La version autonome est déployée depuis la branche `version-autonome`. Les secrets `ECLAT_PASSWORD`, `ECLAT_SESSION_SECRET` et `OPENROUTER_API_KEY` doivent être configurés dans Cloudflare. Sans les deux secrets de protection, le parcours reste fermé.
